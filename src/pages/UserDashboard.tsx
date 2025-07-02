import { useSelector } from "react-redux"
import type { RootState } from "../redux/app/store"

const UserDashboard = () => {
const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div>Xoş gəlmisən, {user?.name}!</div>
  )
}

export default UserDashboard