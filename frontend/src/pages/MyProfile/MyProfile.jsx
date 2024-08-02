export const MyProfile = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token === null && (
        <div>You are not logged in. Please login.</div>
      )}
      {token !== null && (
        <>
          <h1>My Profile</h1>
          <div>Some Stuff Here</div>
        </>
      )}
    </>
  );
};
