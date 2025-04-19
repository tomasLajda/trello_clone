import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the Role model
export interface RoleAttributes {
  id: number;
  name: string;
}

// Define a type for optional attributes (e.g., `id` is optional when creating a new record)
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

// Extend Sequelize's Model class
export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'roles',
      tableName: 'roles',
      timestamps: false,
    }
  );

  return Role;
};
