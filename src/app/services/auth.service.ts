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
      console.log('Auth event:', event, 'Session:', sess);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess?.user ?? null);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
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

  signIn(credentials: { correo: string; contrasena: string }) {
    return this.supabase.auth.signInWithPassword({
      email: credentials.correo,
      password: credentials.contrasena,
    });
  }

  sendPasswordReset(correo: string) {
    return this.supabase.auth.resetPasswordForEmail(correo);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.currentUser.next(null);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null {
    return this.currentUser.value?.id ?? null;
  }

  signInWithEmail(correo: string) {
    return this.supabase.auth.signInWithOtp({ email: correo });
  }
}
