import { auth } from "../../firebase/firebase";

const signOut = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("firebaseToken");
    console.log("Log off");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export default signOut;
