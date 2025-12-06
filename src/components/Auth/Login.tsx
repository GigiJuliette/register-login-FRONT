const LogIn = () => {
  return (
    <>
      <form className="authForm">
        <input type="text" placeholder="Nickname" />
        <input type="email" placeholder="Email" />
        <button type="submit">LogIn</button>
      </form>
    </>
  );
};
export default LogIn;
