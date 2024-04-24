import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import appwriteService from "../../appwrite/config.js";
import { Await, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PostForm({ post }) {
  const [photo, setPhoto] = useState(null);
  const [limit, setLimit] = useState(0);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData?.userData);

  const submit = async (data) => {
    if (post) {
      if (data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        appwriteService.deleteFile(post.imageRequired);
        data.imageRequired = await file.$id;
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        data.imageRequired = file.$id;
        let userId = userData?.$id;
        const dbPost = await appwriteService.createPost(
          { ...data },
          userId,
          userData.name
        );
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    if (post) setPhoto(appwriteService.getFilePreview(post.imageRequired));
  }, []);
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title "
          placeholder="Title"
          className="mb-4"
          limit={limit}
          {...register(
            "title",
            {
              onChange: (e) => {
                setLimit(e.target.value.length);
              },
            },
            { required: true }
          )}
        />
        <Input
          label="Slug "
          placeholder="Slug"
          readOnly
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        <div className="w-full mb-4">
          <img src={photo} className="rounded-lg" />
        </div>
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full rounded-lg"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}