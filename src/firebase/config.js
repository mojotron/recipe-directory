import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeg1cEdHHkTUGMDS5wDTPMrNqYzTyZXFQ",
  authDomain: "recipe-directory-dbb28.firebaseapp.com",
  projectId: "recipe-directory-dbb28",
  storageBucket: "recipe-directory-dbb28.appspot.com",
  messagingSenderId: "729167026340",
  appId: "1:729167026340:web:5ec181cb8c8fbc076c2e31",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const searchRecipes = async (searchQuery) => {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const results = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        data.title.toLowerCase().includes(searchQuery) ||
        data.cookingTime.toLowerCase().includes(searchQuery) ||
        data.mealType.toLowerCase() === searchQuery ||
        data.ingredients.some((ele) => ele.includes(searchQuery)) ||
        data.methods.some((ele) => ele.includes(searchQuery))
      )
        results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    throw error;
  }
};
