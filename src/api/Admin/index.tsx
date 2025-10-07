import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put } from "../Api";
import { toast } from "react-toastify";

export const useUpdatePassword = () =>{
  return useMutation({
    mutationFn:async(passwordData:any) =>{
    return await put("/admin/update-password",passwordData);
    },
    onSuccess:(response)=>{
      if(response.success){
        toast.success(response.message)
      }else{
        console.error( response.message)
      }
    },
    onError:(error:any)=>{
      toast.error(error.response.data.message)
    }
  })
}

export const useGetAllMembersDetails = () =>{
    return useQuery({
        queryKey:["allMembers"],
        queryFn: async() =>{
            const response = await get("/admin/members")
            if(response.success){
                return response.members
            }else{
                throw new Error(response.message || "Failed to fetch members")
            }
        }
    })
}

export const  useGetMemberDetails =(memberId:any)=>{
  return useQuery({
    queryKey:["members",memberId],
    queryFn:async()=>{
      const response = await get(`/admin/get-member/${memberId}`)
      if(response.success){
        return response.member
      }else{
        throw new Error(response.message)
      }
    },
    enabled: !!memberId,
  })
}

export const useUpdateMemberbyId=()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:async({memberId,data}:{memberId:any;data:any})=>{
        return await put(`/admin/update-member/${memberId}`,data)
    },
    onSuccess:(response)=>{
      if(response.success){
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ["members"] });  
      }  else {
        toast.error(response.message);
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.message || "An unknown error occurred ";
      toast.error(errorMessage);
    },
  })
}


export const useGetAllTransactionDetails = () => {
  return useQuery({
    queryKey: ["AllTransactionDetails"],
    queryFn: async () => {
      const response = await get("/admin/transactions");
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch all transactions");
      }
    },
  });
};

export const useGetAllTickets = ()=>{
  return useQuery({
    queryKey:["AllTickets"],
    queryFn:async () =>{
      const response = await get("/admin/tickets")
      if(response.success){
        return response.tickets;
      }else{
        throw new Error(response.message || "Failed to fetch all transactions");
      }
    }
  })
}

export const useUpdateTickets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reply_details }: { id: string; reply_details: string })=> {
     return await put(`/admin/ticket/${id}`, { reply_details });
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({queryKey:["AllTickets"]})
      
      } else {
        toast.error(response.message);
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred while updating the ticket";
      toast.error(errorMessage);
    },
  });
};

export const getEpinsSummary = () => {
  return useQuery({
      queryKey: ["epinsSummary"],
      queryFn: async () => {
          const response = await get("/admin/epin-summary");
          if (response.success) {
              return response.data;
          } else {
              throw new Error(response.message || "Failed to fetch E-Pin summary");
          }
      }
  });
};

export const useGetNews = ()=>{
  return useQuery({
    queryKey:["news"],
    queryFn:async ()=>{
      const response = await get("/admin/getnews")
      if(response.success){
        return response.news
      }else{
        throw new Error(response.message)
      }
    }
  });
};

export const useAddNews = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:async(newsData:any) =>{
    return await post("/admin/addnews",newsData);
    },
    onSuccess:(response)=>{
      if(response.success){
        toast.success(response.message)
        queryClient.invalidateQueries({queryKey:["news"]})
        return response.news
      }else{
        console.error( response.message)
      }
     
    },
    onError:(error:any)=>{
      toast.error(error.response.data.message)
    }
  })
}

export const useGetHoliday = ()=>{
  return useQuery({
    queryKey:["holiday"],
    queryFn:async ()=>{
      const response = await get("/admin/getholiday")
      if(response.success){
        return response.holiday
      }else{
        throw new Error(response.message)
      }
    }
  })
}

export const useAddHoliday = ()=>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn:async(holidayData:any) =>{
    return await post("/admin/addholiday",holidayData);
    },
    onSuccess:(response)=>{
      if(response.success){
        toast.success(response.message)
        queryClient.invalidateQueries({queryKey:["holiday"]})
        return response.news
      }else{
        console.error( response.message)
      }
    },
    onError:(error:any)=>{
      toast.error(error.response.data.message)
    }
  })
}

export const useGeneratePackage =()=>{
  return useMutation({
    mutationFn:async(data:any)=>{
      return await post("/admin/generate-package",data)
    },
    onSuccess:(response)=>{
      if(response.success){
        toast.success(response.message)
      }else{
        console.error( response.message)
      }
    },
    onError:(error:any)=>{
      toast.error(error.response.data.message)
    }
  })
}
