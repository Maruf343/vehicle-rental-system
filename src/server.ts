import express, { Request, Response } from 'express';
import initDB from './config/db';
import { userRoute } from './modules/users/user.routes';
import { authRoute } from './auth/auth.route';

const app = express();
app.use(express.json());

// app.post("/users", async (req: Request, res: Response) => {
//     const body = req.body;
//     console.log(body);
// })

app.use("/api/v1/users",userRoute)
app.use("/api/v1/auth",authRoute)

initDB();


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "This is the root route",
        path: req.path
    })
})

// api not found
app.use((req:Request, res:Response) => {
  res.status(404).json({
    success: false,
    message: "API not found",
  });
});



app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})