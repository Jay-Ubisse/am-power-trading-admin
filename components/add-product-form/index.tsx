"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  brand: z.string().min(1, "A marca é obrigatória"),
  price: z.string().min(1, "O preço é obrigatório"),
  description: z.string(),
  image: z.string(),
  category: z.string().min(1, "A categoria é obrigatória"),
  subCategory: z.string().min(1, "A sub-categoria é obrigatória"),
  quantityInStock: z.string(),
});

export function AddProductForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      category: "",
      subCategory: "",
      quantityInStock: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("brand", values.brand),
        formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image", file);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("quantityInStock", values.quantityInStock);

      toast.loading("Cadastrando produto...", { id: "1" });
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toast.success("Produto cadastrado com sucesso.", { id: "1" });
    } catch (error) {
      toast.error("Ocorreu um erro. Tente de novo.", { id: "1" });
      console.error("Error saving product:", error);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-1">
          <span>
            <PlusCircle className="h-5 w-5" />
          </span>
          <span>Novo Produto</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cadastrar Produto</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 mt-10"
          >
            <div className="w-2/5 bg-slate-50 rounded-lg h-fit mt-4">
              <div className="w-full h-[25rem] flex justify-center items-center">
                {preview ? (
                  <img src={preview} className="w-full object-contain" />
                ) : (
                  <p className="text-sm text-slate-800 border border-slate-200 px-4 py-2">
                    Nenhuma imagem selecionada
                  </p>
                )}
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        accept="/image/*"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4 w-3/5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do produto</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-categoria</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantityInStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade em stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto w-fit">
                <Button type="submit">Registrar Produto</Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
