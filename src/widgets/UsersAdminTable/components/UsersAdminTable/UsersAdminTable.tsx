import { useRouter } from "next/router"
import { memo, useCallback } from "react"
import useDeboucedInput from "@hooks/useDeboucedInput"
import { useDeleteUserMutation, useGetAllUsersQuery } from "@entities/user"
import convertMongoDbDate from "@shared/lib/helper/convertMongoDbData"
import { AdminTableActions } from "@features/AdminTableActions"
import { AdminTable } from "@entities/table"
import { getEditUserRoute } from "@shared/routes/routes"

type UsersAdminTableProps = {}

const UsersAdminTable: React.FC<UsersAdminTableProps> = () => {
	const { push } = useRouter()
	const { debouncedValue, input } = useDeboucedInput()
	const { data: users } = useGetAllUsersQuery(debouncedValue)

	const [deleteUser] = useDeleteUserMutation()

	return (
		<div>
			<AdminTableActions {...input} />
			<AdminTable
				cellCount={2}
				columnTitles={["Email", "Registration date"]}
				columnsWidth={["w-1/3", "w-1/6"]}
				data={
					users
						? users.map(u => [
								u.email,
								convertMongoDbDate(u.createdAt),
						  ])
						: []
				}
				actions={
					users
						? users.map(u => ({
								onEdit: () => push(getEditUserRoute(u._id)),
								onDelete: () => deleteUser(u._id),
						  }))
						: []
				}
			/>
		</div>
	)
}

export default memo(UsersAdminTable)
