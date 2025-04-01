import certification from './certification.json';
import projects from './projects.json';
import skills from './skills.json';
import user from './user.json';

const handleEmptyData = (data, dataType) => {
    if (Object.keys(data).length === 0) {
        throw new Error(`${dataType} data is empty`);
    }
    return data;
};


export const fetchUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(handleEmptyData(user, 'User'));
            } catch (error) {
                reject(error.message);
            }
        }, 500);
    });
};