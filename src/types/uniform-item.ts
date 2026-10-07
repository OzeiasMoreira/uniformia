export interface UniformItemOption {
  id: string
  size: string
  military: boolean
  stockQuantity: number
  uniformType: {
    id: string
    name: string
  }
}
