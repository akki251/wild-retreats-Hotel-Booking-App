import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image_url?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image_url.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image_url
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    // create the cabin
    query = query.insert([{ ...newCabin, image_url: imagePath }]);
  }

  // EDIT
  if (id) {
    query = query
      .update({ ...newCabin, image_url: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw Error("Cabin could not be added");
  }
  
  if (hasImagePath) return data;

  // if no error then upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image_url);

  // if storage error then delete cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw Error("Cabins could not be created due to image upload fail");
  }

  return data;
}
