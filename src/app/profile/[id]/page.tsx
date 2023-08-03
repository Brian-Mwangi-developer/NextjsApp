export default function UserProfile({params}: any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>UserProfile</h1>
            <hr/>
            <p className="text-4xl">User page {params.id}</p>
        </div>
    )
}