import { toast } from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";

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

    // https://sbpazkchfdwkzujzuxvj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    ); const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`


    // 1- Create cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be cteated")
    }

    // 2- Upload image
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)


    // 3- delete the cabin if there was an error uploading image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }
    return data
}