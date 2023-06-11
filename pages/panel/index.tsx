import { useRouter } from "next/router"
import { useEffect } from "react"


const AdminPage = () => {
    const navigate = useRouter()

    useEffect(() => {
        navigate.push('/panel/dashboard')
    }, [])
    return (<></>)
}

export default AdminPage;