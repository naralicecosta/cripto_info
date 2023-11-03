import { Outlet } from "react-router-dom"

export function Layout(){
    return(
        <>
            <h1>Header do projeto</h1>
            <Outlet />
        </>
    )
}