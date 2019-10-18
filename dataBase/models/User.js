module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please enter correct email'
                },
                notNull: {
                    msg: 'Please enter your email'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your name'
                },
                isAlpha: {
                    msg: `Name can contain only letters`
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your password'
                }
            }
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    return User;
};