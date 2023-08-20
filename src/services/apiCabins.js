import { toast } from "react-hot-toast";
import supabase from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase.from('cabins').select('*')
    if (data) {
        toast.success("fetching data successfully")
    }

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be loaded")
    }

    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted")
    }
    return data
}