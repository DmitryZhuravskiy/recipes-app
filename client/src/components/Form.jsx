import React from 'react'

const Form = ({handleSubmit, username, password, setUsername, setPassword, title}) => {
    return (
        <div className="auth-container">
          <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <div className="form-group">
              <label htmlFor="username">Имя:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">{title}</button>
          </form>
        </div>
      );
}

export default Form