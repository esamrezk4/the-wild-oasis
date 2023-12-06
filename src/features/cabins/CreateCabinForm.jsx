import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { CreateEditCabin } from "../../services/apiCabins";
import { useState } from "react";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";





function CreateCabinForm({ cabinToEdit = {} }) {

  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  })
  const { isCreating, createCabin } = useCreateCabin()
  const { isEditing, editCabin } = useEditCabin()

  const { errors } = formState


  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: (data) => reset()
    })
    else createCabin({ ...data, image: image }, {
      onSuccess: (data) => reset()
    })
  }

  function onError(errors) {
  }


  return (

    <Form onSubmit={handleSubmit(onSubmit, onError)}>


      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register('name', {
          required: "this field is required"
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input disabled={isWorking} type="number" id="maxCapacity" {...register('maxCapacity', {
          required: "this field is required", min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input disabled={isWorking} type="number" id="regularPrice" {...register('regularPrice', {
          required: "this field is required", min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />

      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register('discount', { required: "this field is required", validate: value => value <= getValues().regularPrice || "Discount should be less than regular price" })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register('description', { required: "this field is required" })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register('image', {
          required: isEditSession ? false : "this field is required"
        })} disabled={isWorking} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
      </FormRow>
    </Form>

  );
}

export default CreateCabinForm;
