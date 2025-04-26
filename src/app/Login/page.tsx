import LoginForm from './loginForm';

export default function LoginPage() {
  return (
    <section>
      <div className="row w-100 mx-0 auth-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 pe-md-0">
              <div className="auth-side-wrapper" style={{
                height: '40rem',
                backgroundImage: 'url(https://www.lpu.in/lpu-assets/images/cif/login-left.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }} />
            </div>
            <div className="col-md-6 p-md-5">
              <div className="auth-form-wrapper px-4 py-5">
                <h2 className="mb-4">Login Page</h2>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
