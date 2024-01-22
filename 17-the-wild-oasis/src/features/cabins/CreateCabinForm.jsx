import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    function onSubmit(data) {
        let image = { name: "" };
        if (data.image) {
            image = typeof data.image === "string" ? data.image : data.image[0];
        }
        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                { onSuccess: reset }
            );
        else
            createCabin(
                { newCabinData: { ...data, image: image } },
                { onSuccess: reset }
            );
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
                    disabled={isWorking}
                />
            </FormRow>

            <FormRow
                error={errors?.maxCapacity?.message}
                label="Maximum capacity"
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    defaultValue=""
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
