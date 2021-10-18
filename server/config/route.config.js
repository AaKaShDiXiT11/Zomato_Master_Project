import JwtPassport from "passport-jwt";

//database Model
import{UserModel} from "../database/user";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options =  {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp"
};

export default (passport) => {
  passport.use(
    new JwtStrategy(options, async(jwt__payload, done) => {
      try {
        const doseUserExist = UserModel.findById(jwt__payload.user);
        if(!doseUserExist) return done(null, false);

        return done(null, doseUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
