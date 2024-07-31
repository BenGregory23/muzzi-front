
import { useState } from "react"
import { Button } from "../../components/ui/button.tsx"
import { keep } from "../../hooks/keep.tsx"
import { useMainStore } from "../../stores/main.ts"
import { Label } from "@radix-ui/react-label"
import { Input } from "../../components/ui/input.tsx"
import { Link, useNavigate } from "react-router-dom"




export default function SignIn() {
 

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const { setToken, setUser} = useMainStore((state)=>state)
  
  async function fetchUser(token:string){
    try{
      const response = await fetch("http://localhost:3000/users/me", {
        headers:{
          authorization: "Bearer " + token
        }
      })
      if(response.ok){
        return response.json()
      }
    }
    catch(e){
      console.error(e)
    }
  }

  async function signin(){
    try{

      const result = await fetch("http://localhost:3000/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })

      if(result){
        console.log("Signin success")
        // get body data
        const data = await result.json()
     
        if(data.access_token){

          setToken(data.access_token)
          keep.set("token",data.access_token)

          const user = await fetchUser(data.access_token)
          console.log(user)
          setUser(user)

            // TODO: redirect to home
            navigate("/")


        }
       
      }

    }catch(e){
      console.error(e)
    }
  }

  //Redirect if user is already logged in
  if(keep.get("token")){
    // TODO: redirect to home
    navigate("/")
  }



  return (
    <div className="flex justify-center items-center border-l border-secondary w-full bg-background h-full text-white ">
      <div className="flex items-center justify-center py-12">
        <div className=" w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <Button onClick={()=>signin()} className="w-full">
              Sign in
            </Button>
     
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}