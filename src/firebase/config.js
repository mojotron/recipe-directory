import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
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

export const getRecipes = async () => {
  try {
    const recipesCol = collection(db, "recipes");
    const recipesSnapshot = await getDocs(recipesCol);
    if (recipesSnapshot.empty) throw new Error("No recipes to load");
    const recipesList = recipesSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return recipesList;
  } catch (error) {
    throw error;
  }
};

export const getSingleRecipe = async (id) => {
  try {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("No such recipe");
    return docSnap.data();
  } catch (error) {
    throw error;
  }
};

export const addRecipe = async (recipeData) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), { ...recipeData });
    console.log(docRef.id);
  } catch (error) {
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    await deleteDoc(doc(db, "recipes", id));
  } catch (error) {
    throw error;
  }
};

export const updateRecipe = async (id, data) => {
  try {
    const docRef = doc(db, "recipes", id);
    await updateDoc(docRef, { ...data });
  } catch (error) {
    throw error;
  }
};

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
