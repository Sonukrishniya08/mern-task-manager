function Login() {
  return (
    <div className="page-container">

      <div className="card">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;