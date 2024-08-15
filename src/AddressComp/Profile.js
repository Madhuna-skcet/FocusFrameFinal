import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase"; // Ensure this path is correct
import { ref, get } from "firebase/database"; // Import Realtime Database methods
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./Profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user data from Firebase Realtime Database
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `Users/${user.uid}`); // Path to user data in the database
          const snapshot = await get(userRef); // Fetch data from the database
          if (snapshot.exists()) {
            setUserDetails(snapshot.val()); // Set user details
            console.log("User details:", snapshot.val());
          } else {
            console.log("No such document!");
            toast.error("User data not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data.");
        }
      } else {
        console.log("User is not logged in");
        toast.error("User is not logged in.");
      }
    });
  };

  useEffect(() => {
    fetchUserData(); // Fetch data on component mount
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login"; // Redirect to login page
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Failed to log out.");
    }
  };

  return (
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-image-wrapper">
            <img
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"}
              className="profile-image"
              alt="User profile"
            />
          </div>
          <h3 className="welcome-message">Welcome, {userDetails.userName} 🙏🙏</h3>
          <div className="user-details">
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>User Name:</strong> {userDetails.userName}</p>
          </div>
          <button className="btn btn-primary logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
