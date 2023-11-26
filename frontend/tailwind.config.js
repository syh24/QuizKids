/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				bold: '#F2B20F', // 강조색
				primary: '#FFE3A3', // 보조색1 (아이콘)
				secondary: '#FFF6E1', // 보조색2 (텍스트)
				background: '#D5D5D5', // 배경색

				'text-primary': '#595959' // 글꼴 (강조)
			}
		}
	},
	plugins: []
};
