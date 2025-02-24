export interface LoginResponse {
  token: string
  user: IUser
}

export interface RegisterResponse {
  user: IUser
  token: string
}

export interface Region {
  _id: string
  name: string
  polygon: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  user: {
    _id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface IAddress {
  street?: string
  number?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
}

export interface IRegion {
  _id: string
}

export interface IUser {
  _id: string
  name: string
  email: string
  address?: IAddress
  coordinates?: [number, number]
  regions: string[]
  createdAt: string
  updatedAt: string
}

export interface IUserCreate {
  name: string
  email: string
  password: string
  address?: IAddress
  coordinates?: [number, number]
}

export interface IUserUpdate {
  name?: string
  email?: string
  password?: string
  address?: IAddress
  coordinates?: [number, number]
}

export interface AuthResponse {
  token: string
  user: IUser
}
