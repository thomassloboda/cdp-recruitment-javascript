module.exports = {
    handledArgs: () => {
        if (process.argv.length === 2) {
            return {
                filter: null,
                count: false,
            };
        }
        const args = process.argv.slice(2);
        const filterArg = args.find((arg) => arg.startsWith('--filter='));
        const countArg = args.find((arg) => arg.startsWith('--count'));

        if (filterArg) {
            return {
                filter: filterArg.split('=')[1],
                count: !!countArg,
            };
        } else {
            return {
                filter: null,
                count: !!countArg,
            };
        }
    }
};
