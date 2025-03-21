import { useEffect, useState } from 'react'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../../api/categories'
import { useAppDispatch, useAppSelector } from '../../hook/redux'
import { TCategory } from '../../types/categories'
import "./categories.css"

export default function Categories() {
	const { categories } = useAppSelector(({ categories }) => categories)
	const dispatch = useAppDispatch()

	const [categoryData, setCategoryData] = useState({ name: '' })
	const [editedCategory, setEditedCategory] = useState<{ id: number; name: string } | null>(null)

	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setCategoryData(prev => ({ ...prev, [name]: value }))
	}

	const handleAddCategory = (e: React.FormEvent) => {
		e.preventDefault()
		if (categoryData.name) {
			dispatch(addCategory(categoryData))
			setCategoryData({ name: '' }) 
		}
	}

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editedCategory) {
			const { name, value } = e.target
			setEditedCategory(prev => ({ ...prev!, [name]: value }))
		}
	}

	const handleUpdateCategory = (e: React.FormEvent) => {
		e.preventDefault()
		if (editedCategory && editedCategory.name !== '') {
			dispatch(updateCategory(editedCategory))
			setEditedCategory(null) 
		}
	}

	return (
		<>
			<h1 className='h1'> Todolist</h1>

			<form className='addform' onSubmit={handleAddCategory}>
				<input
					type="text"
					name="name"
					className='inp1'
					placeholder="Name"
					value={categoryData.name}
					onChange={handleInputChange}
					required
				/>
				<button className='addbtn' type="submit">Add</button>
			</form>

			{editedCategory && (
				<form className='editform' onSubmit={handleUpdateCategory}>
					<input
						type="text"
						name="name"
						className='inp2'
						value={editedCategory.name}
						onChange={handleEditChange}
						required
					/>
					<button className='editbtn' type="submit">edit</button>
				</form>
			)}

			<table className='table'>
				<thead className='thead'>
					<tr className=''>
						<th className='th'>Id</th>
						<th className='th'>Name</th>
						<th className='th'>Actions</th>
					</tr>
				</thead>
				<tbody className='tbody'>
				{categories.map((category: TCategory) => (
					<tr  className=' tr' key={category.id}>
						<td className='id'>{category.id}</td>
						<td className='name'>{category.name}</td>
						<td className='button'>
						<button className='delete' onClick={() => dispatch(deleteCategory(category.id))}>
							Delete
						</button>
						<button className='edit' onClick={() => setEditedCategory({ id: category.id, name: category.name })}>
							Edit
						</button>
						</td>
					</tr>
				))}
				</tbody>
				
			</table>
		</>
	)
}
