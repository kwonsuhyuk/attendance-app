import "../firebase";

function MainPage() {
  // const currentUser = useRecoilValue(userState);
  // const auth = getAuth();
  // console.log(currentUser);
  // const logout = async () => {
  //   try {
  //     console.log(currentUser);
  //     await signOut(auth);
  //     console.log("Logout successful");
  //   } catch (error) {
  //     console.log("sibal");
  //     console.error("Logout error", error);
  //   }
  // };

  return (
    <div>
      <div>main</div>
      <button onClick={() => console.log("logout")}>logout</button>
    </div>
  );
}

export default MainPage;
