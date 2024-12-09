"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/app/context/AuthContext";
import { FilledTextField } from "material-you-react";
import { Autocomplete, createTheme, TextField, ThemeProvider } from "@mui/material";
import { green } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function Topbar({ toggle }: NavbarProps) {
  const [names, setNames] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    fetch("https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/names/get-names").then(async (res)=>{
      if(res.status == 200 || res.status == 201){
        setNames(await res.json());
      }else{
        setNames([]);
      }
    });
  });
  const user = useAuthContext();
  const theme = createTheme({
    palette: {
      primary:green
    }
  });
  return (
    <div className="flex justify-between items-center pt-[37px] pb-7 mx-[8.25%]">
      <div className="flex">
        <img
          src="/navbar/menu.svg"
          alt="menu"
          className="cursor-pointer"
          onClick={toggle}
        />
        <Link href={user === null ? "/login" : "/my-account"}>
          <img src="/navbar/user.svg" alt="user" className="pl-[30px]" />
        </Link>
      </div>
      <Link href="/">
        <img src="/navbar/logo.svg" alt="logo" />
      </Link>
      <div className="flex items-center">
        <ThemeProvider theme={theme}>
          <Autocomplete getOptionLabel={(e:any)=> e.name} isOptionEqualToValue={(e:any, v)=> e.name === v} options={names.filter((e:any)=> e.type !== 'subCategory')} onChange={(e, value:any)=>{
            console.log(value);
            if(value.type === 'product'){
              router.push('/products/' + value.name.toLowerCase().replaceAll(" ", "-"));
            }else if(value.type === 'category'){
              router.push('/explore?category=' + value.name.toLowerCase().replaceAll(" ", "-"));
            }
          }} className="mr-6"
            renderInput={(params) => <TextField {...params} label="Search..." style={{
              width: '200px'
            }} margin="dense" size="small" />} />
        </ThemeProvider>
        <img src="/navbar/search.svg" alt="search" />

        <Link href={"/cart"}>
          <img src="/navbar/cart.svg" alt="cart" className="pl-[30px]" />
        </Link>
      </div>
    </div>
  );
}
