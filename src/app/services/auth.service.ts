import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,

          // Esta función reemplaza el lock manager
          lock: async (
            _name: string,
            _acquireTimeout: number,
            callback: () => Promise<any>
          ) => {
            return await callback();
          },
        },
      }
    );

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess?.user ?? null);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
  }

  setCachedProfile(profile: any) {
    localStorage.setItem('perfil', JSON.stringify(profile));
  }

  getCachedProfile(): any {
    const perfil = localStorage.getItem('perfil');
    return perfil ? JSON.parse(perfil) : null;
  }

  clearCachedProfile() {
    localStorage.removeItem('perfil');
  }

  private async loadUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error al cargar usuario:', error);
      this.currentUser.next(null);
    } else {
      this.currentUser.next(data.user ?? null);
    }
  }

  signUp(credentials: { correo: string; contrasena: string }) {
    return this.supabase.auth.signUp({
      email: credentials.correo,
      password: credentials.contrasena,
    });
  }

  async signIn({ email, password }: { email: string; password: string }) {
    return await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  }

  async sendPasswordReset(correo: string) {
    return await this.supabaseClient.auth.resetPasswordForEmail(correo);
  }

  async signOut() {
    await this.supabaseClient.auth.signOut();
    this.currentUser.next(null);
    this.clearCachedProfile();
    localStorage.removeItem('perfil');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  async getUserProfile() {
    const userId = this.getCurrentUserId();
    if (!userId) return null;

    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }

    return data;
  }

  getCurrentUserId(): string | null {
    return this.currentUser.value?.id ?? null;
  }

  signInWithEmail(correo: string) {
    return this.supabase.auth.signInWithOtp({ email: correo });
  }

  async refreshCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error al refrescar usuario:', error);
      this.currentUser.next(null);
    } else {
      this.currentUser.next(data.user ?? null);
    }
  }

  get supabaseClient(): SupabaseClient {
    return this.supabase;
  }
}
