import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '../utils/axiosRequest'

export const getCategories=createAsyncThunk("categories/getCategories",async()=>{
	try {
		const {data}=await axiosRequest.get("/categories")
		return data.data
	} catch (error) {
		console.log(error);
		
	}
})

export const deleteCategory=createAsyncThunk("categories/deleteCategory",async(categories:number,{dispatch})=>{
	try {
		await axiosRequest.delete(`/categories?id=${categories}`)
		dispatch(getCategories())
	} catch (error) {
		console.log(error);
		
	}
})


export const addCategory = createAsyncThunk(
  "categories/addCategory", 
  async (categoryData: { name: string }, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post('/categories', categoryData);
      
      dispatch(getCategories());
      
      return data; 
    } catch (error) {
      console.log(error);
    }
  }
);


export const updateCategory = createAsyncThunk(
  "categories/updateCategory", 
  async (categoryData: { id: number, name: string }, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(`/categories/${categoryData.id}`, categoryData);
      dispatch(getCategories());
      return data; 
    } catch (error) {
      console.log(error);
    }
  }
);
