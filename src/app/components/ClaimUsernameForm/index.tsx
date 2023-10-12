import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation, FormError } from './styles'
import { ArrowRight } from 'phosphor-react'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }, // use 'isSubmitted' with next/navigation to disable button after click
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername({ username }: ClaimUsernameFormData) {
    router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          crossOrigin=""
          {...register('username')}
        />

        <Button size="sm" type="submit" disabled={isSubmitted}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        {errors.username ? (
          <FormError size="sm">{errors.username.message}</FormError>
        ) : (
          <Text size="sm">Digite o nome do usuário desejado</Text>
        )}
      </FormAnnotation>
    </>
  )
}
