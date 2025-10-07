export type Member= {
  id: string
  dateOfBirth: string
  imageurl?: string
  displayName: string
  created: string
  lastActive: string
  description?: any
  gender: string
  city: string
  country: string
}

export type Photo = {
  id: number
  url: string
  publicId?: any
  memberId: string
}


export type EditableMember={
  displayName: string;
  description: string;
  city:string;
  country:string;
}
