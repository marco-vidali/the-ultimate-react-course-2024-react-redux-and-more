import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow error={errors?.name?.message} label="Cabin name">
                <Input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                    disabled={isCreating}
                />
            </FormRow>

            <FormRow
                error={errors?.maxCapacity?.message}
                label="Maximum capacity"
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                error={errors?.regularPrice?.message}
                label="Regular price"
            >
                <Input
                    type="number"
                    disabled={isCreating}
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow error={errors?.discount?.message} label="Discount">
                <Input
                    type="number"
                    id="discount"
                    disabled={isCreating}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            parseFloat(value) <=
                                parseFloat(getValues().regularPrice) ||
                            "Discount must be less than the regular price",
                    })}
                />
            </FormRow>

            <FormRow
                error={errors?.description?.message}
                label="Description for website"
            >
                <Textarea
                    role="textbox"
                    type="number"
                    id="description"
                    disabled={isCreating}
                    defaultValue=""
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
