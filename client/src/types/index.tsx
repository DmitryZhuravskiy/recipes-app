export interface IForm {
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  username: string;
  password: string;
  setUsername: Function;
  setPassword: Function;
  title: string;
  isRegister: boolean;
  setRegister: Function;
}

export interface IRegister {
  isRegister: boolean;
  setRegister: Function;
}

export interface IRecipe {
  _id: string
  name: string
  ingredients: string[]
  description: string
  imageUrl: string
  tags: string[]
  likes: string[]
  cookingTime: number
  instructions?: string
}

export interface ICreateRecipe extends IRecipe {
    userOwner: string | null;
}

export interface ISerch {
  recipes: IRecipe[];
  setRecipes: Function;
}
