// app/login/loginApi.ts

export async function loginUser(email: string, password: string) {
    try {
      const res = await fetch('https://your-api.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        throw new Error('Login failed');
      }
  
      return await res.json(); // returns token/user data
    } catch (error) {
      throw error;
    }
  }
  