import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import { REGISTERED } from '../../utils/consts';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: CreationOptional<string>;

  roles!: string[];

  name?: CreationOptional<string>;

  email!: string;

  password!: string;

  avatar?: CreationOptional<string>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [REGISTERED],
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /(?=^\S{6,256}$)^.+$/i,
    },
  },
  avatar: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
});

export default User;
