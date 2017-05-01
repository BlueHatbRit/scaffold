---
title: How Flags Work
position: 3
---

If you've never used or come across the idea of Feature Flags / Feature Toggles before, read through [this article](https://martinfowler.com/articles/feature-toggles.html) first to get an idea how what they are and the intentions behind them.

### What you should NOT do with feature flags

* Feature flags are not a secure role based access control (RBAC) system. If you need to restrict a users access to a feature for security purposes you should investigate a real RBAC system. This may change in the future!
* Feature flags are not a way to restrict access to "unlockables" such as yet to unlock levels in your game.

### How do feature flags work in Scaffold?

Feature flags are designed to be powerful and flexible, it is important to understand how they work or you might find users unexpectedly having or not having access to your features.

Scaffold flags have three different access types, and by combining these access types you can easily cover complex scenarios. The picture below highlights the controls for each access type.

<img src="/images/flag-sample.png" style="width: 100%;">

1. **Global Flag** - As global kill switch, if it is turned off in any situation then no one will have access to the feature. If set to "on" with no other access types, all users will be able to access the feature.
2. **Percentage Flag** - Allow percentage of your users access to a feature. If a percentage flag is set to 0, then the access type is disabled and it will not be evaluated.
3. **Group flag** - Grant specific user groups access to the flag.

#### Examples

Below are a few scenarios which might help to solidify how flags work within Scaffold.

| Type | Value |
|------|-------|
| Global setting | ON |
| Percentage | 10% |
| Groups | NONE |

A user will only have access if they are in the 10th percentile of users. This will be unique for user flag combinations making testing more realistic.
{: .success }

| Type | Value |
|------|-------|
| Global setting | ON |
| Percentage | 10% |
| Groups | Staff |

A user will only have access if they are in the 10th percentile of users OR in the Staff group.
{: .success }

| Type | Value |
|------|-------|
| Global setting | OFF |
| Percentage | 50% |
| Groups | Staff |

No one will have access to this flag as the global switch is turned off.
{: .success }