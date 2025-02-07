import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function NodeForm({ clickedNode, submitHandler, fields }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fields.forEach((field) => {
      setValue(field.name, clickedNode[field.name]);
    });
  }, [clickedNode, setValue]);

  const onSubmit = (data) => submitHandler(data, clickedNode.id);

  return (
    <div className="bg-black h-full p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-start"
      >
        {fields.map((property) => (
          <Input
            key={property.name}
            label={property.label}
            type={property.type}
            register={register}
            name={property.name}
          />
        ))}

        <Button label="Save" type="submit" />
      </form>
    </div>
  );
}

export default NodeForm;
