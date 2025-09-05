"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, ArrowLeft } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, "O nome do produto é obrigatório."),
  description: z.string().min(10, "A descrição é obrigatória."),
  category: z.string().min(2, "A categoria é obrigatória."),
  imageUrl: z.string().url("URL da imagem inválida."),
  options: z.array(z.object({
    label: z.string().min(1, "O rótulo da opção é obrigatório."),
    price: z.coerce.number().min(0.01, "O preço deve ser maior que zero."),
  })).min(1, "Adicione pelo menos uma opção de preço."),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      imageUrl: '',
      options: [{ label: '', price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
    toast({
      title: "Produto (quase) criado!",
      description: "Os dados foram validados. A integração com o banco de dados ainda será implementada.",
    });
    // Aqui você adicionaria a lógica para salvar os dados no backend
    // router.push('/admin');
  };

  return (
    <div className="container mx-auto py-10">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Adicionar Novo Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Cartão de Visita" {...field} />
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
                        <Input placeholder="Ex: Impressos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva os detalhes do produto..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="text-lg font-medium mb-4">Opções de Preço e Quantidade</h3>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4 p-4 border rounded-md">
                      <FormField
                        control={form.control}
                        name={`options.${index}.label`}
                        render={({ field }) => (
                           <FormItem className="flex-grow">
                            <FormLabel>Rótulo da Opção</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 100 unidades" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`options.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ label: '', price: 0 })}
                  >
                   <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Opção
                </Button>
              </div>
              <CardFooter className="px-0 pt-6">
                <Button type="submit">Salvar Produto</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
