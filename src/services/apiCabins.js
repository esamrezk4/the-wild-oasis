import { toast } from "react-hot-toast";
import supabase from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase.from('cabins').select('*')
    if (data) {

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

export async function CreateCabin(newCabin) {

    const { data, error } = await supabase
        .from('cabins')
        .insert([newCabin])
        .select()

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be cteated")
    }
    return data
}