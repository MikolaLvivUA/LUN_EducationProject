module.exports = (sequelize, DataTypes) => {
    const House = sequelize.define('House', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        square: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isNumeric: {
                    msg: "square can't contain letters"
                },
                notNull: {
                    msg: "Please enter square"
                }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter city"
                }
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                notNull:{
                    msg: "please enter price"
                },
                isNumeric:{
                    msg: "price can't contain letters"
                }
            }
        }
    }, {
        tableName: 'house',
        timestamps: false
    });

    const User = sequelize.import('./User.js');
    House.belongsTo(User, {foreignKey: 'user_id'});

    return House;
};