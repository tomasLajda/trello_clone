import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Role } from './role.model.js';

// Define the attributes for the User model
export interface UserAttributes {
  id?: number; // Optional because it is auto-generated
  username: string;
  email: string;
  password: string;
}

// Define a type for optional attributes (e.g., `id` is optional when creating a new record)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize's Model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // Custom methods for roles
  public setRoles!: (roles: Role[]) => Promise<void>;
  public getRoles!: () => Promise<Role[]>;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'users',
      tableName: 'users',
      timestamps: false, // Disable timestamps if not needed
    }
  );

  return User;
};
