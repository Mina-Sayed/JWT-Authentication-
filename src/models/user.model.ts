import User from '../types/user.types'
import db from '../database'

class UserModel {
  // create

  async create(u: User): Promise<User> {
    try {
      // connect to database
      const connections = await db.connect()
      const sql =
        'INSERT INTO users (email, user_name, first_name, last_name, password) VALUES($1, $2, $3, $4, $5) RETURNING email, user_name, first_name, last_name'
      // run query
      const result = await connections.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
      ])
      // relase connections
      connections.release()
      // return created user
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `unable to create user ${u.user_name}: ${(error as Error).message}`
      )
    }
  }

  // get all users

  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT id,email, user_name, first_name, last_name from users '
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrevieng users: ${(error as Error).message}`)
    }
  }

  // get specific user

  async getOne(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT id,email,user_name,first_name,last_name FROM users WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not found user with id ${id} in database ${
          (error as Error).message
        }`
      )
    }
  }

  // update

  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE users SET email = $1, user_name = $2, first_name = $3, last_name = $4 password=$5 WHERE id = $6 RETURNING id, email, user_name, first_name, last_name'

      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
        u.id,
      ])

      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not update user: ${u.user_name}, ${(error as Error).message}`
      )
    }
  }

  // delete
  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users WHERE id = ${id} RETURNING id,email,user_name,first_name,last_name`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete user ${id} , ${(error as Error).message}`
      )
    }
  }

  // auhtenticate users
}

export default UserModel
