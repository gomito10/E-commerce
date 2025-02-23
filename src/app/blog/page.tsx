import type { Metadata } from "next";

export const metadata: Metadata = {
  title:{
    default:"Blogs",
    absolute:"",
    template:""
  } ,
  description: "Generado pir Blog",
};

export default function Blog(){
  return (
    <h1>Blog</h1>
  )
}