import Users from "../server/controller/Users";

let req;
let res;
let next;
let users = [
    {
        name: "John Doe",
        email: "email@example.com",
        password: "password",
    },
];

const fakeRepository = {
    create: (user) => {
        if (user.email === users[0].email) {
            return handleEmailExists(user.email);
        }
        users.push(user);
        return user;
    },
};

const handleEmailExists = (email) => {
    if (email) {
        res.status = 500;
        res.message = "Email ALready Exists!";
    }
    return email;
};

beforeEach(() => {
    req = {
        body: {
            name: "John Doe",
            email: "email@example.com",
            password: "password",
        },
    };
    res = {
        status: 500,
        message: "Email ALready Exists!",
    };
    next = () => {};
});

describe("Create User", () => {
    it("should not be able creat a user with email already exists", () => {
        const { name, email, password } = req.body;

        const fakeUser = {
            name: name,
            email: email,
            password: password,
        };
        const user = fakeRepository.create(fakeUser);
        expect(user).toEqual(handleEmailExists(email));
    });
});
