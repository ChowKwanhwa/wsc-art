export type Language = 'zh' | 'en';

export const translations = {
    zh: {
        hero: {
            title: "诗书合璧",
            subtitle: "Wsc Art",
            description: "巫师传先生的艺术世界",
        },
        intro: {
            bioTitle: "艺术家简介",
            name: "巫师传",
            titles: "字山竹 · 号吉塱山人 · 别署吉庐",
            desc1Strong: "诗心铸魂，墨韵千秋。",
            desc2: "巫师传先生，1945年生于广东惠阳，乃深圳市书法家协会创始人之一。半个多世纪以来，先生于诗香墨韵间潜心耕耘，以“诗书合璧”之独特造诣，在当代书坛独树一帜。",
            desc3: "其书，起于诗心，源于墨韵。挥毫落纸间，如有游龙惊鸿之姿，既具风樯阵马之雄浑气势，又不乏云升雾涌之含蓄意境。刚柔相济，铁画银钩，尽显毫端万象。",
            desc4: "先生不仅是造诣精深的书法大家，更是一位境界高远的诗人。其诗词立足盛唐正脉，情真意切，立意高远。读其诗，可见笔墨之灵动；赏其字，可悟诗词之深邃。诗书交融，浑然天成，实乃当今书坛不可多得的“诗书双绝”大家。",
            tags: ["中国书法家协会会员", "中华诗词学会会员", "中国楹联学会会员", "深圳书协创始人"],
        },
        philosophy: {
            title: "艺术理念",
            desc: "巫师传先生的书法，自始至终贯穿着“诗心为魂”的底色。在遍汲众家之长后自成一体，挥毫落纸间，尽显非凡气度。",
            principles: [
                { title: "诗心为魂", desc: "笔墨起于诗心，源于墨韵", seal: "心" },
                { title: "书臻神功", desc: "书风清雅俊秀，具二王风韵", seal: "神" },
                { title: "诗书合璧", desc: "读诗可见笔墨灵动，赏字可悟诗词深邃", seal: "合" },
            ]
        },
        featured: {
            title: "镇馆之宝 · 云山苍茫",
            desc: "此作融汇宋元山水之气韵，笔墨苍润，气势磅礴。巫师传先生以“诗心”入画，运笔如行云流水，山峦叠嶂间似有诗意流淌。",
            hint: "沉浸式赏析",
        },
        gallery: {
            title: "作品画廊",
            viewAll: "全部作品",
            categories: [
                { title: "行草风韵", count: "30+ 作品" },
                { title: "自作诗词", count: "20+ 作品" },
                { title: "楹联墨迹", count: "15+ 作品" },
            ]
        },
        collections: {
            title: "个人收藏",
            desc: "除了创作，巫师传先生亦醉心于古今书画收藏。这里展示了他多年来精心搜集的艺术珍品，以此作为艺术交流与鉴赏的延伸。",
            button: "浏览藏品",
        },
        timeline: {
            title: "艺术历程",
            events: [
                { year: "1945", title: "生于广东惠阳", desc: "开启艺术人生" },
                { year: "1980s", title: "创立书协", desc: "参与创建深圳市书法家协会" },
                { year: "2014", title: "名家邀请展", desc: "作品参展“投资时报——秋季·当代书画名家邀请展”" },
                { year: "2023", title: "跨界交流", desc: "出席电影文化活动，拓展艺术边界" },
            ]
        },
        footer: {
            nav: {
                works: "作品",
                bio: "简介",
                collections: "收藏",
                contact: "联系",
            },
            copyright: "Copyright © {year} Wsc Art. All rights reserved.",
            slogan: "诗心墨韵 · 薪火相传",
        }
    },
    en: {
        hero: {
            title: "Poetry & Ink",
            subtitle: "Wsc Art",
            description: "The Artistic World of Master Wu Shichuan",
        },
        intro: {
            bioTitle: "Artist Biography",
            name: "Wu Shichuan",
            titles: "Style Name: Shanzhu · Alias: Jilang Shanren / Jilu",
            desc1Strong: "A Soul Forged in Poetry, A Legacy etched in Ink.",
            desc2: "Born in 1945 in Huiyang, Guangdong, Mr. Wu Shichuan is one of the founders of the Shenzhen Calligraphy Association. For over half a century, he has cultivated his craft within the realms of poetry and ink, establishing a unique voice in the contemporary calligraphy world through his dual mastery of both arts.",
            desc3: "His calligraphy originates from the poetic heart and flows from the rhythm of ink. His brushwork displays the vigor of dragons and the grace of swans—possessing both the thunderous momentum of storms and the subtle elegance of rising mists. With a balance of strength and softness, his strokes reveal a universe of expression.",
            desc4: "Mr. Wu is not only a profound calligrapher but also a poet of high realm. His poetry, rooted in the orthodox traditions of the High Tang, is sincere and lofty. Reading his poems, one sees the fluidity of ink; observing his calligraphy, one comprehends the depth of his verse. The perfect union of poetry and calligraphy makes him a rare 'Dual Master' in today's art world.",
            tags: ["Member, China Calligraphers Association", "Member, China Poetry Society", "Member, China Couplet Institute", "Founder, Shenzhen Calligraphy Association"],
        },
        philosophy: {
            title: "Artistic Philosophy",
            desc: "Mr. Wu's calligraphy is fundamentally colored by his 'Poetic Soul'. After absorbing the strengths of many masters, he formed his own style, displaying extraordinary grace and dignity with every stroke.",
            principles: [
                { title: "Poetic Soul", desc: "Brushwork starts from the heart, flowing from ink rhythm", seal: "Heart" },
                { title: "Divine Skill", desc: "Elegant and graceful style, echoing the Two Wangs", seal: "Spirit" },
                { title: "Dual Harmony", desc: "See the ink in poems, understand the verse in calligraphy", seal: "Union" },
            ]
        },
        featured: {
            title: "Masterpiece · Cloud Mountain",
            desc: "This work blends the spirit of Song and Yuan landscapes, with moist ink and majestic momentum. Mr. Wu infuses painting with a 'poetic heart', wielding the brush like flowing clouds and water, creating poetry among the layered peaks.",
            hint: "Immersive View",
        },
        gallery: {
            title: "Gallery",
            viewAll: "All Works",
            categories: [
                { title: "Cursive Style", count: "30+ Works" },
                { title: "Original Poetry", count: "20+ Works" },
                { title: "Couplets", count: "15+ Works" },
            ]
        },
        collections: {
            title: "Collections",
            desc: "Beyond creation, Mr. Wu is also dedicated to collecting ancient and modern paintings and calligraphy. Displayed here are treasures he has meticulously gathered over the years, serving as an extension of artistic exchange and appreciation.",
            button: "View Collections",
        },
        timeline: {
            title: "Artistic Journey",
            events: [
                { year: "1945", title: "Born in Huiyang", desc: "The beginning of an artistic life" },
                { year: "1980s", title: "Founded Association", desc: "Co-founded Shenzhen Calligraphy Association" },
                { year: "2014", title: "Invitational Exhibition", desc: "Exhibited at 'Investment Times - Autumn Contemporary Masters'" },
                { year: "2023", title: "Cultural Exchange", desc: "Attended film cultural events, expanding artistic boundaries" },
            ]
        },
        footer: {
            nav: {
                works: "Works",
                bio: "Bio",
                collections: "Collections",
                contact: "Contact",
            },
            copyright: "Copyright © {year} Wsc Art. All rights reserved.",
            slogan: "Poetic Heart & Ink Rhythm · Passing the Torch",
        }
    }
};
